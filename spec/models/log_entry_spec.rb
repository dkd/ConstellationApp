require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe LogEntry do
  before(:each) do
    @log_entry = LogEntry.new
  end

  describe "#save" do
    it "should insert itself into the data store" do
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:insert).with(@log_entry)
      @log_entry.save
    end
  end

  describe "#delete" do
    it "should delete the log file from the data store" do
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:delete).with(@log_entry)
      @log_entry.delete
    end
  end

  describe ".current_epoch" do
    it "should call the data store" do
      LogEntry.stub!(:new)
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:get).and_return([])
      LogEntry.current_epoch
    end
  end

  describe ".all" do
    before(:each) do
      @data_store  = Constellation::DataStore.instance
      current_time = Time.now
      @key         = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"
    end

    context "given order by application" do
      it "should use the logs_by_application column family" do
        @data_store.should_receive(:get).with(:logs_by_application, @key, anything).and_return([])
        LogEntry.all(:order => "application")
      end
    end
    context "given order by machine" do
      it "should use the logs_by_machine column family" do
        @data_store.should_receive(:get).with(:logs_by_machine, @key, anything).and_return([])
        LogEntry.all(:order => "machine")
      end
    end
    context "given no order" do
      it "should call .current_epoch" do
        LogEntry.should_receive(:current_epoch)
        LogEntry.all
      end
    end
  end

  describe ".where" do
    before(:each) do
      @data_store  = Constellation::DataStore.instance
      current_time = Time.now
      @key = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"
    end

    context "given a compare query" do
      it "should query the given property's column family" do
        @data_store.should_receive(:get).with(:logs_by_application, @key, "ruby").and_return([])
        LogEntry.where(:application => "ruby")
      end

      context "given one property value" do
        it "should return only log entries matching the given parameter" do
          LogEntry.where(:machine => "www42").each { |log_entry| log_entry.machine.should eql("www42") }
        end
      end
    end

    context "given a compare query with multiple properties" do
      before(:each) do
        current_time = Time.now
        @machine = "www42"
        @application = "ruby"
        @key = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}_#{@machine}"
      end

      it "should query the correct column family" do
        @data_store.should_receive(:get).with(:logs_by_machine_and_application, @key, @application).and_return([])
        LogEntry.where(:application => @application, :machine => @machine)
      end
    end

    context "given a range query" do
      it "should return log entries matching the given range" do
        @data_store.should_receive(:get).with(:logs_by_application, @key, :start => "ruby", :finish => "php").and_return([])
        LogEntry.where(:application => ["ruby", "php"])
      end
    end
  end

  describe ".range" do
    context "given logs as column family" do
      it "should call get_keys" do
        LogEntry.should_receive(:get_keys).and_return([])
        LogEntry.range(:logs, "", :start => Time.now, :end => Time.now+60*60)
      end
    end
  end

  describe ".parse_log_entry" do
    before(:each) do
      current_time = Time.now
      @log_entry = [SimpleUUID::UUID.new, "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"]
      @data_store  = Constellation::DataStore.instance
      @data_store.stub!(:get).and_return("uuid" => @log_entry.first.to_guid, "application" => "ruby", "machine" => "www0", "message" => "I love Ruby.")
    end

    it "should generate a guid" do
      @log_entry.first.should_receive(:to_guid)
      LogEntry::parse_log_entry(@log_entry)
    end

    it "should retrieve the log entry from the Cassandra store" do
      @data_store.should_receive(:get).with(:logs, @log_entry[1], @log_entry.first.to_guid)
      LogEntry::parse_log_entry(@log_entry)
    end
  end

  describe ".get" do
    it "should call the data store" do
      LogEntry.stub!(:new)
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:get)
      LogEntry.get('123abc-321cd')
    end
  end

  describe ".get_keys" do
    context "given one date" do
      it "should return one key" do
        LogEntry.get_keys(Time.now-60*60*2).should have(1).item
      end
    end

    context "given a range of two dates" do
      it "should return multiple keys" do
        LogEntry.get_keys(Time.now-60*60*2, Time.now).should have(3).items
      end
    end

    context "given a range of 3 hours" do
      it "should return 4 keys" do
        LogEntry.get_keys(Time.now-60*60*3, Time.now).should have(4).items
      end
    end

    it "should not include duplicates" do
      # uniq! will return nil, if no duplicates were found
      LogEntry.get_keys(Time.now, Time.now+60*60*15).uniq!.should be_nil
    end

    it "should return an Array" do
      LogEntry.get_keys(Time.now).should be_an(Array)
    end
  end
end

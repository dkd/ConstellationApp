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
        LogEntry.where(:property => "application", :equals => "ruby")
      end

      context "given one property value" do
        it "should return only log entries matching the given parameter" do
          LogEntry.where(:property => "application", :equals => "ruby").each { |log_entry| log_entry.application.should eql("ruby") }
        end
      end

      context "given multiple property values" do
        it "should return only log entries matching the given parameters" do
          @data_store.should_receive(:get).with(:logs_by_application, @key, anything).exactly(3).times.and_return([])
          LogEntry.where(:property => "application", :includes => ["ruby", "cassandra", "mail"])
        end
      end
    end

    context "given a range query" do
      it "should return log entries matching the given range" do
        @data_store.should_receive(:get).with(:logs_by_application, @key, :start => "ruby", :finish => "php").and_return([])
        LogEntry.where(:property => "application", :start => "ruby", :end => "php")
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
end
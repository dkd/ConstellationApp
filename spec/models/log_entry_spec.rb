require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe LogEntry do
  before(:each) do
    @log_entry = LogEntry.new
  end

  describe "#save" do
    it "should insert itself into the data store" do
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:insert)
      @log_entry.save
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

  describe ".get" do
    it "should call the data store" do
      LogEntry.stub!(:new)
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:get)
      LogEntry.get('123abc-321cd')
    end
  end
end
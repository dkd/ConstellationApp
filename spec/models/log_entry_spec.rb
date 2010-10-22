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

  describe ".get" do
    it "should call the data store" do
      LogEntry.stub!(:new)
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:get)
      LogEntry.get('123abc-321cd')
    end
  end
end
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

  describe ".all" do
    it "should call the data store" do
      LogEntry.stub!(:new)
      LogEntry.__send__("class_variable_get", "@@data_store").should_receive(:get_range).and_return([])
      LogEntry.all
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
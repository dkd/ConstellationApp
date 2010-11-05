require 'spec_helper'

describe View do
  before(:each) do
    @view = Factory.build(:view)
  end

  describe "#render" do
    context "a compare filter given" do
      before(:each) do
        @view.filter.query_type = "compare"
        @view.filter.property   = "application"
        @view.filter.equals     = "ruby"
      end

      it "should query LogEntry using :equals" do
        LogEntry.should_receive(:where).with(:property => @view.filter.property, :equals => @view.filter.equals)
        @view.render
      end
    end

    context "a range filter given" do
      before(:each) do
        @view.filter.query_type = "range"
        @view.filter.property   = "machine"
        @view.filter.start      = "www23"
        @view.filter.end        = "www42"
      end

      it "should query LogEntry using :equals" do
        LogEntry.should_receive(:where).with(:property => @view.filter.property, :start => @view.filter.start, :end => @view.filter.end)
        @view.render
      end
    end

    context "no filter given" do
      before(:each) do
        @view.filter = nil
      end

      it "should render all available log entries" do
        LogEntry.should_receive(:all)
        @view.render
      end
    end
  end
end
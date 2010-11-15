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
        LogEntry.should_receive(:where).with(:application => @view.filter.equals)
        @view.render
      end

      context "given a date" do
        before(:each) do
          @view.filter = Factory.build(:filter, :property => "date", :equals => "2010/11/08")
        end

        it "should parse two dates" do
          Time.should_receive(:parse).twice
          @view.render
        end

        it "should send two Time objects" do
          LogEntry.should_receive(:where).with(:date => [Time.parse(@view.filter.equals), Time.parse(@view.filter.equals)])
          @view.render
        end
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
        LogEntry.should_receive(:where).with(:machine => [@view.filter.start, @view.filter.end])
        @view.render
      end
    end

    context "given a date" do
      before(:each) do
        @view.filter = Factory.build(:filter, :property => "date", :start => "2010/11/08", :end => "2010/11/09", :query_type => "range")
      end

      it "should parse two dates" do
        Time.should_receive(:parse).twice
        @view.render
      end

      it "should send a Time object" do
        LogEntry.should_receive(:where).with(:date => [Time.parse(@view.filter.start), Time.parse(@view.filter.end)])
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

  describe "#create" do
    context "given no filter" do
      it "should create a filter" do
        @filter = Factory(:filter)
        Filter.should_receive(:new).and_return(@filter)
        View.create(:title => "test")
      end
    end
  end
end

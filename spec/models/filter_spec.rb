require 'spec_helper'

describe Filter do
  describe "#equals" do
    context "given a date" do
      before(:each) do
        @filter = Factory.build(:filter, :property => "date", :equals => "2010/11/08")
      end

      it "should parse the date" do
        Time.should_receive(:parse)
        @filter.equals
      end
      it "should return a Time object" do
        @filter.equals.should be_a(Time)
      end
    end
  end
end

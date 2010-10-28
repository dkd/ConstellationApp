require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe ApplicationHelper do

  describe "include_javascript" do
    context "given a signed in user" do
      before(:each) do
        helper.stub!(:user_signed_in?).and_return(true)
      end

      it "should include javascript" do
        helper.should_receive(:javascript_include_tag)
        helper.include_javascript
      end
    end

    context "given a signed out user" do
      before(:each) do
        helper.stub!(:user_signed_in?).and_return(false)
      end

      it "should not include javascript" do
        helper.should_not_receive(:javascript_include_tag)
        helper.include_javascript
      end
    end
  end

end

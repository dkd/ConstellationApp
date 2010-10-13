require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe ApplicationHelper do

  describe "include_javascript" do
    context "given a signed in user" do
      before(:each) do
        helper.stub!(:user_signed_in?).and_return(true)
      end

      it "should cache seven javascript files as default file" do
        helper.should_receive(:javascript_include_tag).with("ext/adapter/ext/ext-base", "ext/ext-all", "GroupTab", "GroupTabPanel",
                                                            "TabCloseMenu", "constellation", "application", :cache => true)
        helper.include_javascript
      end
    end

    context "given a signed out user" do
      before(:each) do
        helper.stub!(:user_signed_in?).and_return(false)
      end

      it "should cache two javascript files as login.js" do
        helper.should_receive(:javascript_include_tag).with("ext/adapter/ext/ext-base", "ext/ext-all", :cache => "login")
        helper.include_javascript
      end
    end
  end

end

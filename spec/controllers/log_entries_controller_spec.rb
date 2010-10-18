require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe LogEntriesController do
  include Devise::TestHelpers

  before(:each) do
    LogEntry.stub!(:all)
    @user = Factory.create(:user)
    sign_in :user, @user
  end

  describe "GET /log_entries" do
    it_should_be_protected :index

    it "should render all log entries" do
      LogEntry.should_receive(:all)
      get :index
    end
  end

end
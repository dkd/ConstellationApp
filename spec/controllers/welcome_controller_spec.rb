require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe WelcomeController do
  include Devise::TestHelpers

  before(:each) do
    LogEntry.stub!(:current_epoch)
    @user = Factory.create(:user)
    sign_in :user, @user
  end

  describe "GET /" do
    it_should_be_protected :get, :index
  end
end

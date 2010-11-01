require 'spec_helper'

describe UsersController do
  include Devise::TestHelpers

  before(:each) do
    LogEntry.stub!(:current_epoch)
    @user = Factory.create(:user)
    sign_in :user, @user
  end

  describe "GET /users/" do
    it_should_be_protected :index

    it "should render all users" do
      User.should_receive(:find).with(:all)
      get :index
    end
  end

end

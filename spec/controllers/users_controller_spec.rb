require 'spec_helper'

describe UsersController do
  include Devise::TestHelpers

  before(:each) do
    LogEntry.stub!(:current_epoch)
    @user = Factory.create(:user)
    sign_in :user, @user
  end

  describe "GET /users.json" do
    it_should_be_protected :index, :format => :json

    it "should render all users" do
      controller.stub!(:authenticate_user!)
      User.should_receive(:find).with(:all)
      get :index, :format => :json
    end
  end

end

require 'spec_helper'

describe UsersController do
  include Devise::TestHelpers

  before(:each) do
    LogEntry.stub!(:current_epoch)
    @user = Factory.create(:user)
    sign_in :user, @user
    @ar_relation = mock(ActiveRecord::Relation)
    @ar_relation.stub!(:find)
    User.stub!(:select).and_return(@ar_relation)
  end

  describe "GET /users.json" do
    it_should_be_protected :get, :index, :format => :json

    it "should render only id and email attributes" do
      controller.stub!(:authenticate_user!)
      User.should_receive(:select).with(:id, :email)
      get :index, :format => :json
    end

    it "should render all users" do
      controller.stub!(:authenticate_user!)
      @ar_relation.should_receive(:find).with(:all)
      get :index, :format => :json
    end
  end

end

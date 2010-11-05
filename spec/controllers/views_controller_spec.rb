require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe ViewsController do
  include Devise::TestHelpers

  before(:each) do
    @user = Factory.create(:user)
    sign_in :user, @user
    @view = mock(View, :destroy => true, :update_attributes => true)
    View.stub!(:find).and_return(@view)
    @user.stub!(:views).and_return(View)
    controller.stub!(:current_user).and_return(@user)
  end

  describe "GET /views" do
    it_should_be_protected :get, :index
  end

  describe "GET /views/:id" do
    it_should_be_protected :get, :show, :id => 1

    it "should render the given view" do
      @view = mock(View)
      View.stub!(:new).and_return(@view)
      @view.should_receive(:render)
      get :show, :id => 1
    end
  end

  describe "POST /views" do
    it_should_be_protected :post, :create
  end

  describe "PUT /views/:id" do
    it_should_be_protected :put, :update, :id => 1

    it "should use the find_view before filter" do
      controller.should_receive(:find_view)
      controller.instance_variable_set("@view", @view)
      xhr :put, :update, :id => 1
    end
  end

  describe "DELETE /views/:id" do
    it_should_be_protected :delete, :destroy, :id => 1

    it "should use the find_view before filter" do
      controller.should_receive(:find_view)
      controller.instance_variable_set("@view", @view)
      xhr :delete, :destroy, :id => 1
    end
  end

end

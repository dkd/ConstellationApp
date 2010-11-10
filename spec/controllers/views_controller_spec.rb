require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe ViewsController do
  include Devise::TestHelpers

  before(:each) do
    @user = Factory.create(:user)
    sign_in :user, @user
    @view = mock(View, :save => true, :destroy => true, :update_attributes => true, :render => nil, :to_json => {})
    View.stub!(:new).and_return(@view)
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
      View.stub!(:find).and_return(@view)
      @view.should_receive(:render)
      get :show, :id => 1
    end

    it "should render only the current user's views" do
      @user.should_receive(:views)
      get :show, :id => 1
    end
  end

  describe "POST /views" do
    it_should_be_protected :post, :create

    it "should create a view for the current user" do
      @user.should_receive(:views)
      post :create
    end

    context "given save was not successful" do
      before(:each) do
        @view.stub!(:save).and_return(false)
      end

      it "should render the errors" do
        @view.should_receive(:errors)
        post :create
      end
    end
  end

  describe "PUT /views/:id" do
    it_should_be_protected :put, :update, :id => 1

    it "should use the find_view before filter" do
      controller.should_receive(:find_view)
      controller.instance_variable_set("@view", @view)
      xhr :put, :update, :id => 1
    end

    context "given update was not successful" do
      before(:each) do
        @view.stub!(:update_attributes).and_return(false)
      end

      it "should render the errors" do
        @view.should_receive(:errors)
        xhr :put, :update, :id => 1
      end
    end
  end

  describe "DELETE /views/:id" do
    it_should_be_protected :delete, :destroy, :id => 1

    it "should use the find_view before filter" do
      controller.should_receive(:find_view)
      controller.instance_variable_set("@view", @view)
      xhr :delete, :destroy, :id => 1
    end

    context "given destroy was not successful" do
      before(:each) do
        @view.stub!(:destroy).and_return(false)
      end

      it "should render the errors" do
        @view.should_receive(:errors)
        xhr :delete, :destroy, :id => 1
      end
    end
  end

  describe "#find_view" do
    it "should search only for views of the current user" do
      @user.should_receive(:views)
      controller.find_view
    end
  end

end

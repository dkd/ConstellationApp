class UsersController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json

  # GET /users.json
  #----------------------------------------------------------------------------
  def index
    respond_with(User.select([:id, :email]).find(:all))
  end
end

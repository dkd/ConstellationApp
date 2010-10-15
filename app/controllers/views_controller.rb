class ViewsController < ApplicationController
  before_filter :authenticate_user!

  # GET /views
  #----------------------------------------------------------------------------
  def index
  end
end

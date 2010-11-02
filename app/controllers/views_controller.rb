class ViewsController < ApplicationController
  before_filter :authenticate_user!

  # GET /views
  #----------------------------------------------------------------------------
  def index
  end

  # GET /views/:id.json
  #----------------------------------------------------------------------------
  def show
    render :json => { "log_entries" => View.new.render }.to_json
  end
end

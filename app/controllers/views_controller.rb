class ViewsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :find_view, :only => [:update, :destroy]
  # GET /views
  #----------------------------------------------------------------------------
  def index
    respond_to do |format|
      format.html
      format.json { render :json => current_user.views.find(:all).to_json(:include => :filter) }
    end
  end

  # GET /views/:id.json
  #----------------------------------------------------------------------------
  def show
    render :json => { "log_entries" => current_user.views.find(params[:id]).render }.to_json
  end

  # GET /views.json
  #----------------------------------------------------------------------------
  def create
    view = current_user.views.new(params[:view])
    if view.save
      render :json => view
    else
      render :json => view.errors
    end
  end

  # PUT /views/:id.json
  #----------------------------------------------------------------------------
  def update
    if @view.update_attributes(params[:view])
      render :json => @view
    else
      render :json => @view.errors
    end
  end

  # DELETE /views/:id.json
  #----------------------------------------------------------------------------
  def destroy
    if @view.destroy
      render :json => @view
    else
      render :json => @view.errors
    end
  end

  def find_view
    @view = current_user.views.find(params[:id])
  end
end

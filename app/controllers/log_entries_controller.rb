class LogEntriesController < ApplicationController
  before_filter :authenticate_user!

  # GET /log_entries
  # GET /log_entries.json
  #----------------------------------------------------------------------------
  def index
    render :json => { "log_entries" => LogEntry.all(:count => 100) }.to_json
  end
end

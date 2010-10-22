class LogEntriesController < ApplicationController
  before_filter :authenticate_user!

  # GET /log_entries
  # GET /log_entries.json
  #----------------------------------------------------------------------------
  def index
    render :json => { "log_entries" => LogEntry.current_epoch(:count => 100, :reversed => true) }.to_json
  end
end

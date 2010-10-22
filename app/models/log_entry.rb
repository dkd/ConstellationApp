#
# Represents a log entry having the following attributes:
#
# * uuid (key)
# * machine
# * application
# * message
# * timestamp
#
class LogEntry < Constellation::LogEntry

  @@data_store = Constellation::DataStore.instance

  #
  # Initializes and parses the given attributes.
  #
  def initialize(attributes = {})
    @uuid         = attributes["uuid"]
    @machine      = attributes["machine"]
    @application  = attributes["application"]
    @timestamp    = attributes["timestamp"]
    @message      = attributes["message"]
    self
  end

  #
  # Saves the log entry and returns itself.
  #
  def save
    @@data_store.insert(self)
    self
  end

  class << self

    #
    # Returns all log entries found in the Cassandra data store.
    #
    # You can limit the results by defining options.
    #
    # E.g. if you want to get only 50 entries, you can do this by:
    #
    #   LogEntry.all(:count => 50)
    #
    # == Available options
    #
    # * start
    # * finish
    # * consistency
    # * count
    #
    def current_epoch(options = {})
      results       = []
      current_time  = Time.now
      @@data_store.get("#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}", options).each { |log_entry|
        attributes          = log_entry[1]
        attributes["uuid"]  = log_entry[0].to_guid

        results << new(attributes)
      }
      results
    end

    #
    # Returns the log entry defined by the given uuid
    #
    def get(uuid)
      new(@@data_store.get(uuid))
    end

  end

end
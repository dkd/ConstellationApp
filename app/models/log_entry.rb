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
    def all(options = {})
      results      = []
      @@data_store.get_range(options).each { |h|
        attributes = {}
        h.columns.each { |c| attributes[c.column.name] = c.column.value }
        results   << new(attributes)
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
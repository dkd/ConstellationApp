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

  # Deletes the log entry
  def delete
    @@data_store.delete(self)
  end

  class << self
    #
    # Returns all log entries found in the Cassandra data store.
    #
    # You can limit the results by defining options.
    #
    # E.g. if you want to get only 50 entries, you can do this by:
    #
    #   LogEntry.current_epoch(:count => 50)
    #
    # == Available options
    #
    # * start
    # * finish
    # * consistency
    # * count
    #
    def current_epoch(options={})
      results       = []
      current_time  = Time.now
      @@data_store.get(:logs, "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}", options).each { |log_entry|
        attributes         = log_entry[1]
        attributes["uuid"] = log_entry[0].to_guid
        results << new(attributes)
      }
      results
    end

    #
    # Provides an ordered list of log entries.
    #
    # You can define the attribute by which log entries should be ordered by using :order => "attribute_name"
    #
    # E.g. if you want log entries ordered by their application, you can do this by:
    #
    #   LogEntry.all(:order => "application")
    #
    # == Furthermore the following options are available:
    #
    # * consistency
    # * count
    #
    def all(options={})
      results       = []
      current_time  = Time.now
      key           = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"
      case options[:order]
      when "application"
        column_family = :logs_by_application
      when "machine"
        column_family = :logs_by_machine
      else
        return current_epoch(options)
      end
      options.delete(:order)
      @@data_store.get(column_family, key, options).each { |log_entry|
        uuid               = log_entry[1].keys.first.to_guid
        attributes         = @@data_store.get(:logs, key, uuid)
        attributes["uuid"] = uuid
        results << new(attributes)
      }
      results
    end

    # Provides a query interface for log entries
    #
    # You can use compare and range queries for filtering log entries.
    #
    # E.g. if you want to retrieve only log entries between Nov 1 2010 and Nov 10 2010, you can do this by:
    #
    #   LogEntry.where(:attribute => "timestamp")
    #
    def where(options={})
      results       = []
      current_time  = Time.now
      key           = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"
      case options[:attribute]
      when "application"
        column_family = :logs_by_application
      when "machine"
        column_family = :logs_by_machine
      else
        column_family = :logs
      end
      if options[:equals]
        @@data_store.get(column_family, key, options[:equals]).each { |log_entry|
          uuid               = log_entry[1].keys.first.to_guid
          attributes         = @@data_store.get(:logs, key, uuid)
          attributes["uuid"] = uuid
          results << new(attributes)
        }
      elsif options[:includes]
        options[:includes].each { |value|
          @@data_store.get(column_family, key, value).each { |log_entry|
            uuid               = log_entry[1].keys.first.to_guid
            attributes         = @@data_store.get(:logs, key, uuid)
            attributes["uuid"] = uuid
            results << new(attributes)
          }
        }
      elsif options[:start] && options[:end]
        @@data_store.get(column_family, key, :start => options[:start], :finish => options[:end]).each { |log_entry|
          uuid               = log_entry[1].keys.first.to_guid
          attributes         = @@data_store.get(:logs, key, uuid)
          attributes["uuid"] = uuid
          results << new(attributes)
        }
      end
    end

    #
    # Returns the log entry defined by the given uuid
    #
    def get(uuid)
      new(@@data_store.get(uuid))
    end
  end
end
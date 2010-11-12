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
    #   LogEntry.where(:property => "timestamp", :start => Time.parse("Nov 1 2010"), :end => Time.parse("Nov 10 2010"))
    #
    def where(options={})
      results       = []
      current_time  = Time.now
      key           = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"
      case options[:property]
      when "application"
        column_family = :logs_by_application
      when "machine"
        column_family = :logs_by_machine
      else
        column_family = :logs
      end
      if options[:equals]
        @@data_store.get(column_family, key, options[:equals]).each { |log_entry| results << parse_log_entry(log_entry) }
      elsif options[:includes]
        options[:includes].each { |value|
          @@data_store.get(column_family, key, value).each { |log_entry| results << parse_log_entry(log_entry) }
        }
      elsif options[:start] && options[:end]
        results = range(column_family, key, :start => options[:start], :end => options[:end])
      end
      results
    end

    def range(column_family, key, options={})
      results = []
      if column_family==:logs
        get_keys(options[:start], options[:end]).each { |key|
          @@data_store.get(column_family, key, :start => options[:start], :finish => options[:end]).each { |log_entry|
            attributes = log_entry[1]
            attributes["uuid"] = log_entry[0].to_guid
            results << new(attributes)
          }
        }
      else
        @@data_store.get(column_family, key, :start => options[:start], :finish => options[:end]).each { |attribute_value|
          attribute_value[1].keys.each { |uuid|
            guid               = uuid.to_guid
            attributes         = @@data_store.get(:logs, key, guid)
            attributes["uuid"] = guid
            results            << new(attributes)
          }
        }
      end
      results
    end

    #
    # Parses a log entry from an Ordered Hash
    #
    def parse_log_entry(log_entry, reversed=false)
      uuid               = log_entry[0].to_guid
      attributes         = @@data_store.get(:logs, log_entry[1], uuid)
      attributes["uuid"] = uuid
      new(attributes)
    end

    #
    # Returns the log entry defined by the given uuid
    #
    def get(uuid)
      new(@@data_store.get(:logs, uuid))
    end

    #
    # Returns keys that are used for storing log entries in the given time range
    #
    def get_keys(start_date, end_date = nil)
      keys = []
      keys << "#{start_date.year}/#{start_date.month}/#{start_date.day}/#{start_date.hour}"
      unless end_date.nil?
        while start_date <= end_date
          start_date += 60*60
          keys << "#{start_date.year}/#{start_date.month}/#{start_date.day}/#{start_date.hour}" unless start_date > end_date
        end
        keys << "#{end_date.year}/#{end_date.month}/#{end_date.day}/#{end_date.hour}"
      end
      keys.uniq
    end
  end
end
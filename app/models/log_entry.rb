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

  attr_accessor :timestamp

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
      @@data_store.get(:logs, "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}", options).each do |log_entry|
        attributes         = log_entry[1]
        attributes["uuid"] = log_entry[0].to_guid
        results << new(attributes)
      end
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
      @@data_store.get(column_family, key, options).each do |log_entry|
        uuid               = log_entry[1].keys.first.to_guid
        attributes         = @@data_store.get(:logs, key, uuid)
        attributes["uuid"] = uuid
        results << new(attributes)
      end
      results
    end

    # Provides a query interface for log entries
    #
    # You can use compare and range queries for filtering log entries.
    #
    # E.g. if you want to retrieve only log entries between Nov 1 2010 and Nov 10 2010, you can do this by:
    #
    #   LogEntry.where(:date => [Time.parse("Nov 1 2010"), Time.parse("Nov 10 2010")])
    #
    def where(options={})
      results       = []
      current_time  = Time.now
      key           = "#{current_time.year}/#{current_time.month}/#{current_time.day}/#{current_time.hour}"

      # Multiple compares
      if options[:machine].is_a?(String) && options[:application].is_a?(String)
        key = key + "_" + options[:machine]
        @@data_store.get(:logs_by_machine_and_application, key, options[:application]).each do |attribute_value|
          attribute_value[1].keys.each do |uuid|
            guid               = uuid.to_guid
            attributes         = @@data_store.get(:logs, key, guid)
            attributes["uuid"] = guid
            results            << new(attributes)
          end
        end
      # Compare
      elsif options[:machine].is_a?(String)
        @@data_store.get(:logs_by_machine, key, options[:machine]).each { |log_entry| results << parse_log_entry(log_entry) }
      elsif options[:application].is_a?(String)
        @@data_store.get(:logs_by_application, key, options[:application]).each { |log_entry| results << parse_log_entry(log_entry) }
      # Range
      elsif options[:machine].is_a?(Array)
        results = range(:logs_by_machine, key, :start => options[:machine].first, :end => options[:machine].second)
      elsif options[:application].is_a?(Array)
        results = range(:logs_by_application, key, :start => options[:application].first, :end => options[:application].second)
      elsif options[:date].is_a?(Array)
        results = range(:logs, key, :start => options[:date].first, :end => options[:date].second)
      end
      results
    end

    def range(column_family, key, options={})
      results = []
      if column_family==:logs
        get_keys(options[:start], options[:end]).each do |key|
          @@data_store.get(column_family, key, :start => options[:start], :finish => options[:end]).each do |log_entry|
            attributes = log_entry[1]
            attributes["uuid"] = log_entry[0].to_guid
            results << new(attributes)
          end
        end
      else
        @@data_store.get(column_family, key, :start => options[:start], :finish => options[:end]).each do |attribute_value|
          attribute_value[1].keys.each do |uuid|
            guid               = uuid.to_guid
            attributes         = @@data_store.get(:logs, key, guid)
            attributes["uuid"] = guid
            results            << new(attributes)
          end
        end
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
      keys << get_key_for(start_date)
      unless end_date.nil?
        while start_date <= end_date
          start_date += 60*60
          keys << get_key_for(start_date) unless start_date > end_date
        end
        keys << get_key_for(end_date)
      end
      keys.uniq
    end

    # returns a key for the given time object using the format year/month/day/hour
    def get_key_for(time)
      "#{time.year}/#{time.month}/#{time.day}/#{time.hour}"
    end
  end
end

module CommonHelpers
  def parse_human_date(date)
    case date
    when "yesterday"
      (Time.now-one_day).strftime('%m/%d/%Y %H:%i:%s')
    when "today"
      Time.now
    when "tomorrow"
      (Time.now+one_day).strftime('%m/%d/%Y %H:%i:%s')
    end
  end
end

World(CommonHelpers)
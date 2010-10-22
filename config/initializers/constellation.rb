# Run this initializer only in development or production environment
if %w(development production).include? RAILS_ENV
  raise Constellation::ConstellationFileNotFoundError unless File.exists?("ConstellationFile")
  config = Constellation::Config.instance

  # parse ConstellationFile
  begin
    config.instance_eval(File.read("ConstellationFile"))
  rescue SyntaxError
    raise Constellation::InvalidConstellationFileError
  end

  config.data_store.establish_connection
end
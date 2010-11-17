# Run this initializer only in development or production environment
config = Constellation::Config.instance

# parse ConstellationFile
begin
  config.instance_eval(File.read("ConstellationFile"))
rescue SyntaxError
  raise Constellation::InvalidConstellationFileError
end
config.data_store.establish_connection

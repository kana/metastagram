require 'sinatra'




class Metastagram < Sinatra::Application
  ApplicationName = 'Metastagram'

  get '/' do
    'Hello, Sinatra!'
  end
end




__END__

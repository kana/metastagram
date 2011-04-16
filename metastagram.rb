require 'haml'
require 'sinatra'




class Metastagram < Sinatra::Application
  ApplicationName = 'Metastagram'

  get '/' do
    haml :index
  end
end




__END__

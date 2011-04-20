require 'haml'
require 'sinatra'




class Metastagram < Sinatra::Application
  ApplicationName = 'Metastagram'

  get '/' do
    haml :index
  end

  get '/stylesheet.css' do
    sass :stylesheet
  end
end




__END__

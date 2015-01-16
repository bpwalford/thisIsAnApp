class FingerprintBuilder

  attr_reader :user, :params

  def initialize(user, params)
    @user = user
    @params = params
  end

  def build
    Fingerprint.create!(
      user: user,
      plugins: build_plugin_matrix,
      fonts: build_font_hash,
      user_agent: params[:agent],
      browser_version: params[:version],
      cookies: params[:cookies],
      language: params[:language],
      screen: params[:screen],
      ip: params[:ip],
      country: params[:country],
    )
  end

  private

  def build_plugin_matrix
    matrix = []

    pre = params[:plugins].split('||||')
    pre.map{|p| p.gsub!(/\|\|\||\|\|/, '|')}
    pre.map{|p| matrix << p.split('|')}

    matrix
  end

  def build_font_hash
    fonts = {}

    pre = params[:fonts].split(',')
    pre.each do|font|
      s = font.split('|')
      fonts[s.first.to_sym] = s.last
    end

    fonts
  end

end
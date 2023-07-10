async auth(email: string, passwd: string): Promise<[User, AuthToken]> {
    const userExists = await this.userRepository.findOne({ where: [{ email }] })
    if (userExists && (await userExists.checkPassword(passwd))) {
      const authToken = new AuthToken()
      authToken.user = userExists
      const token = await this.authTokenRepository.save(authToken)
      console.log(token)
      return [userExists, authToken]
    } else {
      return null
    }
  }
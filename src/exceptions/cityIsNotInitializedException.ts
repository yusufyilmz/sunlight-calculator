import HttpException from './httpException';

class CityIsNotInitializedException extends HttpException {
  constructor() {
    super(404, 'City is not initialized');
  }
}

export default CityIsNotInitializedException;

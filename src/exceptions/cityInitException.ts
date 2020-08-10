import HttpException from './httpException';

class CityInitException extends HttpException {
  constructor() {
    super(404,  'There has been an error at city initialization');
  }
}

export default CityInitException;

import HttpException from './httpException';

class NeighbourHoodNotFoundException extends HttpException {
  constructor(neighbourHood: string) {
    super(404, `${neighbourHood} neighbourHood is not found`);
  }
}

export default NeighbourHoodNotFoundException;

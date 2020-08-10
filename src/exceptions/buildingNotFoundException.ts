import HttpException from './httpException';

class BuildingNotFoundException extends HttpException {
  constructor(neighbourHood: string, building: string) {
    super(404, `${building} building is not found at ${neighbourHood} neighbourHood`);
  }
}

export default BuildingNotFoundException;

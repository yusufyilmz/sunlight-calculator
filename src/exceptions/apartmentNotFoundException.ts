import HttpException from './httpException';

class ApartmentNotFoundException extends HttpException {
  constructor(id: number , building: string, neighbourHood: string) {
    super(404, `Apartment with number ${id}, is not found at ${building}, ${neighbourHood}`);
  }
}

export default ApartmentNotFoundException;

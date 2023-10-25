export const mockGeolocationResolve = {
	getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
		Promise.resolve(
			success({
				coords: {
					latitude: 50.1,
					longitude: 50.1,
				},
			})
		)
	),
};

export const mockGeolocationReject = {
	getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
		Promise.resolve(
			error({
				code: 1,
				message: 'GeoLocation Error',
			})
		)
	),
};

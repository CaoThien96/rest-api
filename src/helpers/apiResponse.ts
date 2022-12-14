import { Response } from 'express';
export const successResponse = function (res: Response, msg: string) {
	var data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};

export const successResponseWithData = function (res: Response, msg: string, data: any) {
	var resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

export const ErrorResponse = function (res: Response, msg: string) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};
export const ErrorResponseWithStatus = function (res: Response, msg: string, status = 0) {
	var data = {
		status,
		message: msg,
	};
	return res.status(500).json(data);
};

export const notFoundResponse = function (res: Response, msg: any) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

export const validationErrorWithData = function (res: Response, msg: string, data: any) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

export const unauthorizedResponse = function (res: Response, msg: string) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};
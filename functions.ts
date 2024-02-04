import QRCode from "qrcode";
import fs, { ReadStream, WriteStream, createReadStream } from "fs";

export const generateQrCode = (text: string): ReadStream  => {
	const filename = `./assets/${text}.png`;

	fs.open(filename, "w", function (err, file) {
		if (err) throw err;
		console.log("Saved!");

		QRCode.toFile(
			filename,
			text,
			{
				errorCorrectionLevel: "H",
			},
			function (err) {
				if (err) throw err;
				console.log("QR code saved!");
			}
		);
	});

	console.log(text);

	// QRCode.toFile(
	// 	filename,
	// 	text,
	// 	{
	// 		errorCorrectionLevel: "H",
	// 	},
	// 	function (err) {
	// 		if (err) throw err;
	// 		console.log("QR code saved!");
	// 	}
	// );
	return fs.createReadStream(filename);
};

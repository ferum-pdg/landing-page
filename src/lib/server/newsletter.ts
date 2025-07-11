import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/newsletter-data.json');

export function insertNews(newItem: { mail: string; timestamp: string }): boolean {
	try {
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
		}

		const rawData = fs.readFileSync(filePath, 'utf-8');
		const data = JSON.parse(rawData) as { mail: string; timestamp: string }[];

		const exists = data.some(item => item.mail.toLowerCase() === newItem.mail.toLowerCase());

		if (exists) {
			console.log('Nouveau mail enregistré :', newItem.mail);
			return true;
		}

		data.push(newItem);
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

		console.log('Nouveau mail enregistré :', newItem.mail);
		return true;
	} catch (err) {
		console.error('Erreur lors de l\'insertion dans le fichier JSON :', err);
		return false;
	}
}

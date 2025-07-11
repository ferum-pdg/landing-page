import { json } from '@sveltejs/kit';
import { insertNews } from '$lib/server/newsletter';

export async function POST({ request }) {
	const body = await request.json();
	const { email, timestamp } = body;

	if (!email || !timestamp) {
		return json({ success: false, message: 'Champs manquants' }, { status: 400 });
	}

	const success = insertNews({ mail: email, timestamp });

	if (!success) {
		return json({ success: false, message: 'Adresse déjà inscrite' }, { status: 409 });
	}

	return json({ success: true });
}

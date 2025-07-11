<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let mobileMenuOpen = false;
	let scrollY = 0;
	let isVisible = {};
	let emailAddress = '';
	let footerEmail = '';
	let currentMockupIndex = 0;

	// Mockups pour la galerie iPhone
	const mockupScreens = [
		{
			title: "Accueil",
			content: `
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<div class="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
							<span class="font-bold text-gray-900">Ferum</span>
						</div>
						<div class="text-2xl">🏃‍♂️</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
							<div class="text-2xl font-bold text-blue-600">2.5K</div>
							<div class="text-xs text-blue-600">pas aujourd'hui</div>
						</div>
						<div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 text-center">
							<div class="text-2xl font-bold text-orange-600">💪</div>
							<div class="text-xs text-orange-600">Entraînement IA</div>
						</div>
					</div>
					<div class="space-y-2">
						<div class="flex justify-between text-sm">
							<span class="text-gray-600">Objectif hebdomadaire</span>
							<span class="text-gray-800 font-semibold">75%</span>
						</div>
						<div class="w-full bg-gray-200 rounded-full h-2">
							<div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-3/4"></div>
						</div>
					</div>
				</div>
			`
		},
		{
			title: "Entraînements IA",
			content: `
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="font-bold text-gray-900">Entraînements IA</h3>
						<div class="text-xl">🤖</div>
					</div>
					<div class="space-y-3">
						<div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
							<div class="flex items-center justify-between mb-2">
								<span class="font-semibold text-blue-800">Course matinale</span>
								<span class="text-sm text-blue-600">30 min</span>
							</div>
							<div class="text-sm text-blue-600 mb-2">Recommandé par l'IA</div>
							<div class="flex items-center space-x-2">
								<div class="w-full bg-blue-200 rounded-full h-1">
									<div class="bg-blue-600 h-1 rounded-full w-2/3"></div>
								</div>
								<span class="text-xs text-blue-600">67%</span>
							</div>
						</div>
						<div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
							<div class="flex items-center justify-between mb-2">
								<span class="font-semibold text-green-800">Yoga récupération</span>
								<span class="text-sm text-green-600">20 min</span>
							</div>
							<div class="text-sm text-green-600 mb-2">Adapté à votre fatigue</div>
							<button class="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold">
								Commencer
							</button>
						</div>
					</div>
				</div>
			`
		},
		{
			title: "Communauté",
			content: `
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="font-bold text-gray-900">Communauté</h3>
						<div class="text-xl">👥</div>
					</div>
					<div class="space-y-3">
						<div class="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
							<div class="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
							<div class="flex-1">
								<div class="font-semibold text-gray-900 text-sm">Marie</div>
								<div class="text-xs text-gray-600">A terminé un 10K 🏃‍♀️</div>
							</div>
							<div class="text-xs text-gray-400">2h</div>
						</div>
						<div class="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
							<div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
							<div class="flex-1">
								<div class="font-semibold text-gray-900 text-sm">Thomas</div>
								<div class="text-xs text-gray-600">Nouveau record personnel! 🏆</div>
							</div>
							<div class="text-xs text-gray-400">1h</div>
						</div>
						<div class="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
							<div class="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
							<div class="flex-1">
								<div class="font-semibold text-gray-900 text-sm">Lucas</div>
								<div class="text-xs text-gray-600">S'entraîne maintenant 💪</div>
							</div>
							<div class="w-2 h-2 bg-green-500 rounded-full"></div>
						</div>
					</div>
				</div>
			`
		},
		{
			title: "Statistiques",
			content: `
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="font-bold text-gray-900">Statistiques</h3>
						<div class="text-xl">📊</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
							<div class="text-2xl font-bold text-purple-600">45</div>
							<div class="text-xs text-purple-600">Séances ce mois</div>
						</div>
						<div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
							<div class="text-2xl font-bold text-green-600">12h</div>
							<div class="text-xs text-green-600">Temps total</div>
						</div>
					</div>
					<div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
						<div class="flex items-center justify-between mb-2">
							<span class="font-semibold text-orange-800">Progression</span>
							<span class="text-sm text-orange-600">+15%</span>
						</div>
						<div class="space-y-2">
							<div class="flex justify-between text-sm">
								<span class="text-orange-600">Endurance</span>
								<span class="text-orange-800 font-semibold">85%</span>
							</div>
							<div class="w-full bg-orange-200 rounded-full h-2">
								<div class="bg-orange-600 h-2 rounded-full w-5/6"></div>
							</div>
						</div>
					</div>
				</div>
			`
		}
	];

	// Fonction pour changer de mockup automatiquement
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isVisible[entry.target.id] = true;
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('[id]').forEach(el => {
			observer.observe(el);
		});

		// Rotation automatique des mockups
		const mockupInterval = setInterval(() => {
			currentMockupIndex = (currentMockupIndex + 1) % mockupScreens.length;
		}, 3000);

		return () => {
			observer.disconnect();
			clearInterval(mockupInterval);
		};
	});

	async function handleNewsletterSubmit(event) {
		event.preventDefault();

		console.log("event: ", event)

		const emailData = {
			email: emailAddress,
			timestamp: new Date().toISOString()
		};

		console.log("data: ", emailData)

		try {
			const response = await fetch('/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(emailData)
			});

			const result = await response.json();

			if (result.success) {
				alert(`Merci ${emailAddress} ! Vous serez averti du lancement de ferum 🚀`);
				emailAddress = '';
			} else {
				alert(`Erreur : ${result.message}`);
			}
		} catch (error) {
			console.error('Erreur réseau:', error);
			alert('Une erreur est survenue. Veuillez réessayer plus tard.');
		}
	}

	const features = [
		{
			icon: '🤖',
			title: 'IA Personnalisée',
			description: 'Algorithmes d\'optimisation d\'entraînements qui s\'adaptent à votre niveau, vos disponibilités et vos objectifs sportifs.',
			tech: 'Deep Learning + Java Quarkus'
		},
		{
			icon: '👥',
			title: 'Réseau Social Sportif',
			description: 'Connectez-vous avec une communauté active, partagez vos performances et motivez-vous ensemble.',
			tech: 'Architecture temps réel'
		},
		{
			icon: '⌚',
			title: 'Multi-Appareils',
			description: 'Synchronisation automatique avec Garmin, Apple Watch ainsi que Wahoo.',
			tech: 'Terra API + Health Connect'
		},
		{
			icon: '📊',
			title: 'Analytics Avancées',
			description: 'Métriques détaillées, analyses prédictives et recommandations intelligentes pour optimiser vos performances.',
			tech: 'TimescaleDB + Machine Learning'
		},
		{
			icon: '🎯',
			title: 'Objectifs Adaptatifs',
			description: 'Plans d\'entraînement qui évoluent en temps réel selon vos progrès et votre forme du moment.',
			tech: 'Algorithmes génétiques'
		},
		{
			icon: '🏆',
			title: 'Défis Communautaires',
			description: 'Participez à des défis, créez des groupes d\'entraînement et célébrez vos victoires ensemble.',
			tech: 'Gamification + Social'
		}
	];

	const techLogos = [
		{ name: 'Java Quarkus', logo: '☕' },
		{ name: 'Flutter', logo: '📱' },
		{ name: 'Kubernetes', logo: '☸️' },
		{ name: 'PostgreSQL', logo: '🐘' },
		{ name: 'AI/ML', logo: '🧠' }
	];

	const testimonials = [
		{
			content: "Ferum a complètement transformé ma façon de m'entraîner. L'IA comprend vraiment mes besoins et s'adapte à mon emploi du temps chargé. Incroyable !",
			author: "Marie Dubois",
			role: "Marathonienne amateur",
			avatar: "👩‍🦰"
		},
		{
			content: "En tant que coach, j'utilise Ferum pour suivre tous mes clients. La plateforme facilite énormément la planification et le suivi des progrès.",
			author: "Thomas Martin",
			role: "Coach sportif professionnel",
			avatar: "👨‍💼"
		},
		{
			content: "L'aspect social de Ferum m'a permis de rester motivé pendant le confinement. La communauté est vraiment bienveillante et inspirante.",
			author: "Lucas Rodriguez",
			role: "Passionné de fitness",
			avatar: "🧑‍🦱"
		}
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<svelte:window bind:scrollY />

<div class="bg-white">
	<!-- Header -->
	<header class="absolute inset-x-0 top-0 z-50">
		<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5 flex items-center space-x-2">
					<div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
						<span class="text-white font-bold text-sm">F</span>
					</div>
					<span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ferum</span>
				</a>
			</div>
			
			<div class="flex lg:hidden">
				<button type="button" on:click={toggleMobileMenu} class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
					<span class="sr-only">Ouvrir le menu principal</span>
					<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
			</div>
			
			<div class="hidden lg:flex lg:gap-x-12">
				<a href="#features" class="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colors">Fonctionnalités</a>
				<a href="#technology" class="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colors">Technologies</a>
				<a href="#testimonials" class="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colors">Témoignages</a>
				<a href="#contact" class="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colors">Équipe</a>
			</div>
			
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a href="#newsletter" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
					Rejoindre la beta <span aria-hidden="true">🚀</span>
				</a>
			</div>
		</nav>
		
		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="lg:hidden" role="dialog" aria-modal="true" transition:fly="{{ y: -100, duration: 300 }}">
				<div class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" on:click={toggleMobileMenu}></div>
				<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
					<div class="flex items-center justify-between">
						<a href="/" class="-m-1.5 p-1.5 flex items-center space-x-2">
							<div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span class="text-white font-bold text-sm">F</span>
							</div>
							<span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ferum</span>
						</a>
						<button type="button" on:click={toggleMobileMenu} class="-m-2.5 rounded-md p-2.5 text-gray-700">
							<span class="sr-only">Fermer le menu</span>
							<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-500/10">
							<div class="space-y-2 py-6">
								<a href="#features" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Fonctionnalités</a>
								<a href="#technology" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Technologies</a>
								<a href="#testimonials" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Témoignages</a>
								<a href="#contact" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Équipe</a>
							</div>
							<div class="py-6">
								<a href="#newsletter" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Rejoindre la beta</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</header>

	<main>
		<!-- Hero section -->
		<div id="hero" class="relative isolate pt-14">
			<svg class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200" aria-hidden="true">
				<defs>
					<pattern id="ferum-hero-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
						<path d="M100 200V.5M.5 .5H200" fill="none" />
					</pattern>
				</defs>
				<svg x="50%" y="-1" class="overflow-visible fill-gray-50">
					<path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
				</svg>
				<rect width="100%" height="100%" stroke-width="0" fill="url(#ferum-hero-pattern)" />
			</svg>
			
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
				<div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
					{#if isVisible.hero !== false}
						<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}">
							<div class="flex">
								<div class="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-blue-600/20 transition-all">
									<span class="font-semibold text-blue-600">🚀 Projet étudiant</span>
									<span class="h-4 w-px bg-gray-900/10" aria-hidden="true"></span>
									<a href="https://heig-vd.ch" class="flex items-center gap-x-1 hover:text-blue-600 transition-colors" target="_blank">
										<span class="absolute inset-0" aria-hidden="true"></span>
										HEIG-vd
										<svg class="-mr-2 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					{/if}

					{#if isVisible.hero !== false}
						<div in:fly="{{ y: 50, duration: 800, delay: 200, easing: quintOut }}">
							<h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
								L'avenir du <span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">sport intelligent</span>
							</h1>
						</div>
					{/if}

					{#if isVisible.hero !== false}
						<div in:fly="{{ y: 50, duration: 800, delay: 400, easing: quintOut }}">
							<p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
								Révolutionnez votre expérience sportive avec Ferum : le réseau social qui combine intelligence artificielle, 
								planification d'entraînements personnalisés et communauté passionnée pour vous aider à atteindre vos objectifs.
							</p>
						</div>
					{/if}

					{#if isVisible.hero !== false}
						<div in:fly="{{ y: 50, duration: 800, delay: 600, easing: quintOut }}">
							<div class="mt-10 flex items-center gap-x-6">
								<a href="#features" class="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300">
									Découvrir le projet
								</a>
								<a href="#technology" class="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colors">
									Technologies utilisées <span aria-hidden="true">→</span>
								</a>
							</div>
						</div>
					{/if}
				</div>
								
				<!-- Galerie de mockups iPhone -->
				<div class="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
					{#if isVisible.hero !== false}
						<div in:scale="{{ duration: 1000, delay: 800, easing: quintOut }}">
							<!-- iPhone Mockup avec galerie -->
							<div class="mx-auto w-80 max-w-full">
								<div class="relative">
									<!-- Effet de glow -->
									<div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
									
									<!-- Cadre iPhone -->
									<div class="relative bg-black rounded-[3rem] p-2 shadow-2xl">
										<div class="bg-black rounded-[2.5rem] p-2">
											<!-- Encoche iPhone -->
											<div class="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10"></div>
											
											<!-- Écran -->
											<div class="bg-gradient-to-br from-gray-100 to-white rounded-[2rem] p-6 min-h-[600px] relative overflow-hidden">
												<!-- Barre de status
												<div class="flex justify-between items-center text-black text-sm font-semibold mb-4 pt-4">
													<div>9:41</div>
													<div class="flex items-center space-x-1">
														<div class="flex space-x-1">
															<div class="w-1 h-1 bg-black rounded-full"></div>
															<div class="w-1 h-1 bg-black rounded-full"></div>
															<div class="w-1 h-1 bg-black rounded-full"></div>
														</div>
														<div class="ml-2">
															<div class="w-6 h-3 border border-black rounded-sm">
																<div class="w-4 h-2 bg-black rounded-sm m-0.5"></div>
															</div>
														</div>
													</div>
												</div>
												-->
												
												<!-- Contenu dynamique -->
												<div class="transition-all duration-500 mt-5">
													{@html mockupScreens[currentMockupIndex].content}
												</div>
												
												<!-- Indicateurs de navigation -->
												<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
													{#each mockupScreens as _, index}
														<button 
															class="w-2 h-2 rounded-full transition-all duration-300 {currentMockupIndex === index ? 'bg-blue-600' : 'bg-gray-300'}"
															on:click={() => currentMockupIndex = index}
														></button>
													{/each}
												</div>
											</div>
										</div>
									</div>
									
									<!-- Titre de l'écran actuel -->
									<div class="mt-4 text-center">
										<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
											{mockupScreens[currentMockupIndex].title}
										</span>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>

			</div>
		</div>

		<!-- Logo cloud -->
		<div class="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
			<div class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
				{#each techLogos as tech}
					<div class="col-span-2 max-h-12 w-full flex flex-col items-center justify-center lg:col-span-1 opacity-60 hover:opacity-100 transition-opacity">
						<div class="text-3xl mb-1">{tech.logo}</div>
						<div class="text-xs text-gray-500 font-medium">{tech.name}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Feature section principale -->
		<div id="features" class="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
			<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
				<div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
					{#if isVisible.features}
						<div in:fly="{{ x: -50, duration: 800, easing: quintOut }}" class="lg:row-start-2 lg:max-w-md">
							<h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
								Boostez vos performances. Commencez à utiliser Ferum dès aujourd'hui.
							</h2>
							<p class="mt-6 text-lg/8 text-gray-300">
								Notre plateforme révolutionnaire combine intelligence artificielle et réseau social pour créer l'expérience sportive parfaite, 
								adaptée à votre niveau et vos objectifs personnels.
							</p>
						</div>
					{/if}
					
					{#if isVisible.features}
						<div in:scale="{{ duration: 800, delay: 200, easing: quintOut }}" class="relative -z-20 max-w-xl min-w-full rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-5xl lg:max-w-none">
							<!-- Dashboard Screenshot Mockup -->
							<div class="bg-gradient-to-br from-gray-100 to-white rounded-xl p-6">
								<div class="space-y-6">
									<!-- Header -->
									<div class="flex items-center justify-between">
										<h3 class="text-xl font-bold text-gray-900">Tableau de bord IA</h3>
										<div class="flex space-x-2">
											<div class="w-3 h-3 bg-red-500 rounded-full"></div>
											<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
											<div class="w-3 h-3 bg-green-500 rounded-full"></div>
										</div>
									</div>
									
									<!-- Analytics Cards -->
									<div class="grid grid-cols-3 gap-4">
										<div class="bg-blue-50 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-blue-600">12</div>
											<div class="text-sm text-blue-600">Entraînements IA</div>
										</div>
										<div class="bg-green-50 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-green-600">89%</div>
											<div class="text-sm text-green-600">Objectifs atteints</div>
										</div>
										<div class="bg-purple-50 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-purple-600">245</div>
											<div class="text-sm text-purple-600">Amis connectés</div>
										</div>
									</div>
									
									<!-- Chart placeholder -->
									<div class="bg-gray-50 rounded-lg p-4 h-32 flex items-center justify-center">
										<div class="text-gray-400 text-center">
											<div class="text-3xl mb-2">📈</div>
											<div class="text-sm">Analyses de performance</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
					
					{#if isVisible.features}
						<div in:fly="{{ x: -50, duration: 800, delay: 400, easing: quintOut }}" class="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
							<dl class="max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
								<div class="relative">
									<dt class="ml-9 inline-block font-semibold text-white">
										<div class="absolute top-1 left-1 size-5 text-blue-400 text-lg">🤖</div>
										IA Personnalisée
									</dt>
									<dd class="inline">Algorithmes adaptatifs qui apprennent de vos habitudes et performances pour optimiser vos entraînements.</dd>
								</div>
								<div class="relative">
									<dt class="ml-9 inline-block font-semibold text-white">
										<div class="absolute top-1 left-1 size-5 text-blue-400 text-lg">👥</div>
										Communauté Active
									</dt>
									<dd class="inline">Rejoignez une communauté bienveillante de sportifs passionnés qui partagent leurs défis et victoires.</dd>
								</div>
								<div class="relative">
									<dt class="ml-9 inline-block font-semibold text-white">
										<div class="absolute top-1 left-1 size-5 text-blue-400 text-lg">⌚</div>
										Synchronisation Multi-Appareils
									</dt>
									<dd class="inline">Compatible avec tous vos appareils connectés pour un suivi complet et automatique de vos activités.</dd>
								</div>
							</dl>
						</div>
					{/if}
				</div>
				
				<!-- Background blur effect -->
				<div class="pointer-events-none absolute top-1/2 left-12 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:-bottom-48 lg:translate-y-0 lg:transform-gpu" aria-hidden="true">
					<div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blue-400 to-purple-600 opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
				</div>
			</div>
		</div>

		<!-- Features grid section -->
		<div id="technology" class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
			{#if isVisible.technology}
				<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}" class="mx-auto max-w-2xl lg:text-center">
					<h2 class="text-base/7 font-semibold text-blue-600">Technologies modernes</h2>
					<p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
						Tout ce dont vous avez besoin pour révolutionner votre sport
					</p>
					<p class="mt-6 text-lg/8 text-gray-600">
						Une architecture technique de pointe combinant Java Quarkus, Flutter, Intelligence Artificielle et DevOps moderne 
						pour offrir une expérience utilisateur exceptionnelle.
					</p>
				</div>
			{/if}
			
			<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
				<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					{#each features as feature, i}
						{#if isVisible.technology}
							<div in:fly="{{ y: 50, duration: 600, delay: i * 100, easing: quintOut }}" class="flex flex-col group hover:scale-105 transition-transform duration-300">
								<dt class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
									<div class="text-3xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
									{feature.title}
								</dt>
								<dd class="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
									<p class="flex-auto">{feature.description}</p>
									<div class="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
										<span class="text-sm font-semibold text-blue-600">🔧 {feature.tech}</span>
									</div>
									<p class="mt-6">
										<a href="/" class="text-sm/6 font-semibold text-blue-600 hover:text-blue-500 transition-colors">
											En savoir plus <span aria-hidden="true">→</span>
										</a>
									</p>
								</dd>
							</div>
						{/if}
					{/each}
				</dl>
			</div>
		</div>

		<!-- Newsletter section -->
		<div id="newsletter" class="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
			<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
				{#if isVisible.newsletter}
					<div in:scale="{{ duration: 800, easing: quintOut }}">
						<h2 class="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
							Soyez averti du lancement de Ferum
						</h2>
						<p class="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
							Rejoignez notre liste d'attente pour être parmi les premiers à découvrir l'avenir du sport intelligent et connecté.
						</p>
					</div>
				{/if}
				
				<!-- TODO: enregistrer l'adresse email dans un fichier local dans l'application SvelteKit -->
				{#if isVisible.newsletter}
					<div in:fly="{{ y: 50, duration: 800, delay: 200, easing: quintOut }}">
						<!-- add action to use js function handleNewsletterSubmit -->
						<form class="mx-auto mt-10 flex max-w-md gap-x-4" on:submit|preventDefault={handleNewsletterSubmit}>
							<label for="email-address" class="sr-only">Adresse email</label>
							<input 
								id="email-address" 
								name="email" 
								type="email" 
								autocomplete="email" 
								required 
								bind:value={emailAddress}
								class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6 transition-all" 
								placeholder="Votre adresse email" 
							/>
							<button 
								type="submit" 
								class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
							>
								Me prévenir 🚀
							</button>
						</form>
					</div>
				{/if}
				
				<!-- Background effect -->
				<svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2" aria-hidden="true">
					<circle cx="512" cy="512" r="512" fill="url(#ferum-newsletter-gradient)" fill-opacity="0.7" />
					<defs>
						<radialGradient id="ferum-newsletter-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
							<stop stop-color="#3B82F6" />
							<stop offset="1" stop-color="#8B5CF6" stop-opacity="0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer id="contact" class="bg-gray-900 sm:mt-56">
		<div class="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
			<div class="xl:grid xl:grid-cols-3 xl:gap-8">
				<div class="flex items-center space-x-2">
					<div class="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
						<span class="text-white font-bold">F</span>
					</div>
					<span class="text-2xl font-bold text-white">Ferum</span>
				</div>
				
				<div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="text-sm/6 font-semibold text-white">Projet</h3>
							<ul role="list" class="mt-6 space-y-4">
								<li><a href="#features" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Fonctionnalités</a></li>
								<li><a href="#technology" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Technologies</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Architecture</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Roadmap</a></li>
							</ul>
						</div>
						<div class="mt-10 md:mt-0">
							<h3 class="text-sm/6 font-semibold text-white">Équipe</h3>
							<ul role="list" class="mt-6 space-y-4">
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">À propos</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">GitHub</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Contribuer</a></li>
							</ul>
						</div>
					</div>
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="text-sm/6 font-semibold text-white">Ressources</h3>
							<ul role="list" class="mt-6 space-y-4">
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Documentation</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">API</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Guides</a></li>
							</ul>
						</div>
						<div class="mt-10 md:mt-0">
							<h3 class="text-sm/6 font-semibold text-white">Légal</h3>
							<ul role="list" class="mt-6 space-y-4">
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Confidentialité</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Conditions</a></li>
								<li><a href="/" class="text-sm/6 text-gray-300 hover:text-white transition-colors">Licence MIT</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			
			<div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
				<div>
					<h3 class="text-sm/6 font-semibold text-white">Restez informé du projet</h3>
					<p class="mt-2 text-sm/6 text-gray-300">Les dernières nouvelles sur le développement de Ferum, directement dans votre boîte mail.</p>
				</div>
				<form class="mt-6 sm:flex sm:max-w-md lg:mt-0">
					<label for="footer-email" class="sr-only">Adresse email</label>
					<input 
						type="email" 
						name="email-address" 
						id="footer-email" 
						autocomplete="email" 
						required 
						class="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:w-56 sm:text-sm/6 transition-all" 
						placeholder="Votre email" 
					/>
					<div class="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
						<button 
							type="submit" 
							class="flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-400 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all duration-300"
						>
							S'abonner
						</button>
					</div>
				</form>
			</div>
			
			<div class="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
				<div class="flex gap-x-6 md:order-2">
					<a href="/" class="text-gray-400 hover:text-gray-300 transition-colors">
						<span class="sr-only">GitHub</span>
						<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
					</a>
					<a href="/" class="text-gray-400 hover:text-gray-300 transition-colors">
						<span class="sr-only">Discord</span>
						<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
						</svg>
					</a>
					<a href="/" class="text-gray-400 hover:text-gray-300 transition-colors">
						<span class="sr-only">LinkedIn</span>
						<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path fill-rule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
				<p class="mt-8 text-sm/6 text-gray-400 md:order-1 md:mt-0">
					© 2024 Ferum - Projet étudiant innovant. Tous droits réservés.
				</p>
			</div>
		</div>
	</footer>
</div>
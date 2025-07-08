<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let scrollY = 0;
	let innerHeight = 0;
	let isVisible = {};

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isVisible[entry.target.id] = true;
				}
			});
		}, { threshold: 0.2 });

		document.querySelectorAll('[id]').forEach(el => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});

	const features = [
		{
			icon: '🤖',
			title: 'IA Personnalisée',
			description: 'Algorithmes d\'optimisation d\'entraînements basés sur vos données de performance et disponibilités',
			tech: 'Deep Java Library + LangChain4j'
		},
		{
			icon: '👥',
			title: 'Réseau Social',
			description: 'Connectez-vous avec d\'autres sportifs, partagez vos progrès et motivez-vous mutuellement',
			tech: 'Architecture événementielle temps réel'
		},
		{
			icon: '⌚',
			title: 'Multi-Appareils',
			description: 'Synchronisation automatique avec Garmin, Apple Watch, et 90+ autres appareils connectés',
			tech: 'Terra API + Health Connect'
		},
		{
			icon: '📊',
			title: 'Analytics Avancées',
			description: 'Métriques de performance en temps réel avec prédictions et recommandations intelligentes',
			tech: 'TimescaleDB + Prometheus'
		},
		{
			icon: '🎯',
			title: 'Objectifs Adaptatifs',
			description: 'Plans d\'entraînement qui s\'adaptent automatiquement selon vos progrès et contraintes',
			tech: 'Algorithmes génétiques'
		},
		{
			icon: '🔒',
			title: 'Sécurité RGPD',
			description: 'Protection des données de santé avec chiffrement bout-en-bout et conformité européenne',
			tech: 'OAuth 2.0 + JWT'
		}
	];

	const techStack = [
		{
			category: 'Backend',
			icon: '⚡',
			color: 'from-blue-500 to-blue-700',
			items: ['Java Quarkus', 'Microservices', 'Architecture Réactive', 'GraalVM Native']
		},
		{
			category: 'Frontend',
			icon: '📱',
			color: 'from-cyan-500 to-cyan-700',
			items: ['Flutter', 'Web + Mobile', 'Riverpod', 'Material Design']
		},
		{
			category: 'Intelligence Artificielle',
			icon: '🧠',
			color: 'from-purple-500 to-purple-700',
			items: ['Deep Java Library', 'LangChain4j', 'Modèles Prédictifs', 'Recommandations ML']
		},
		{
			category: 'Infrastructure',
			icon: '🚀',
			color: 'from-green-500 to-green-700',
			items: ['Kubernetes', 'Docker', 'GitHub Actions', 'Prometheus + Grafana']
		}
	];

	const architectureFeatures = [
		{
			title: 'Microservices Événementiels',
			description: 'Architecture scalable avec 7 microservices spécialisés',
			icon: '🏗️'
		},
		{
			title: 'Déploiement Cloud-Native',
			description: 'Kubernetes avec auto-scaling et haute disponibilité',
			icon: '☁️'
		},
		{
			title: 'CI/CD Automatisé',
			description: 'Pipeline DevOps complet avec tests et déploiements sécurisés',
			icon: '🔄'
		},
		{
			title: 'Monitoring 360°',
			description: 'Observabilité complète avec métriques, logs et tracing',
			icon: '📈'
		}
	];
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!-- Hero Section -->
<section class="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 overflow-hidden">
	<!-- Animated background elements -->
	<div class="absolute inset-0">
		{#each Array(20) as _, i}
			<div 
				class="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 2}s;"
			></div>
		{/each}
	</div>

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
		<div class="text-center">
			{#if isVisible.hero !== false}
				<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}">
					<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
						<span class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ferum</span>
						<br>
						<span class="text-3xl sm:text-4xl lg:text-5xl">Le Futur du Sport Social</span>
					</h1>
				</div>
			{/if}

			{#if isVisible.hero !== false}
				<div in:fly="{{ y: 50, duration: 800, delay: 200, easing: quintOut }}">
					<p class="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
						Une plateforme révolutionnaire qui combine réseau social sportif et intelligence artificielle 
						pour créer des programmes d'entraînement personnalisés et connecter une communauté passionnée.
					</p>
				</div>
			{/if}

			{#if isVisible.hero !== false}
				<div in:fly="{{ y: 50, duration: 800, delay: 400, easing: quintOut }}" class="flex flex-col sm:flex-row gap-6 justify-center items-center">
					<button class="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse">
						🚀 Découvrir le Projet
					</button>
					<button class="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
						📋 Architecture Technique
					</button>
				</div>
			{/if}
		</div>

		<!-- Floating Cards Preview -->
		{#if isVisible.hero !== false}
			<div in:fly="{{ y: 100, duration: 1000, delay: 600, easing: quintOut }}" class="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
				{#each [
					{ icon: '🤖', title: 'IA Avancée', desc: 'Planification intelligente' },
					{ icon: '👥', title: 'Social', desc: 'Communauté active' },
					{ icon: '⌚', title: 'IoT', desc: '90+ appareils connectés' }
				] as card, i}
					<div 
						class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
						style="animation-delay: {i * 0.2}s;"
					>
						<div class="text-4xl mb-3">{card.icon}</div>
						<h3 class="text-white font-bold text-lg mb-2">{card.title}</h3>
						<p class="text-white/80 text-sm">{card.desc}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-24 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if isVisible.features}
			<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}" class="text-center mb-20">
				<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
					Fonctionnalités <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Révolutionnaires</span>
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					Une plateforme complète qui réinvente l'expérience sportive grâce à l'intelligence artificielle et la technologie moderne.
				</p>
			</div>
		{/if}

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, i}
				{#if isVisible.features}
					<div 
						in:fly="{{ y: 50, duration: 600, delay: i * 100, easing: quintOut }}"
						class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
					>
						<div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
						<h3 class="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
						<p class="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
						<div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
							<span class="text-sm font-semibold text-blue-600">🔧 {feature.tech}</span>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- Tech Stack Section -->
<section id="tech" class="py-24 bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if isVisible.tech}
			<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}" class="text-center mb-20">
				<h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
					Stack Technique <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moderne</span>
				</h2>
				<p class="text-xl text-gray-300 max-w-3xl mx-auto">
					Technologies de pointe pour une architecture scalable, performante et sécurisée.
				</p>
			</div>
		{/if}

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each techStack as tech, i}
				{#if isVisible.tech}
					<div 
						in:fly="{{ y: 50, duration: 600, delay: i * 150, easing: quintOut }}"
						class="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-all duration-300 group hover:scale-105"
					>
						<div class="bg-gradient-to-r {tech.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">
							{tech.icon}
						</div>
						<h3 class="text-2xl font-bold text-white mb-6">{tech.category}</h3>
						<ul class="space-y-3">
							{#each tech.items as item}
								<li class="flex items-center text-gray-300">
									<div class="w-2 h-2 bg-gradient-to-r {tech.color} rounded-full mr-3"></div>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- Architecture Section -->
<section id="architecture" class="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if isVisible.architecture}
			<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}" class="text-center mb-20">
				<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
					Architecture <span class="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Cloud-Native</span>
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					Une architecture microservices moderne, scalable et résiliente pensée pour la production.
				</p>
			</div>
		{/if}

		<!-- Architecture Diagram -->
		{#if isVisible.architecture}
			<div in:scale="{{ duration: 800, delay: 200, easing: quintOut }}" class="bg-white rounded-3xl p-8 shadow-2xl mb-16">
				<div class="grid lg:grid-cols-3 gap-8 items-center">
					<!-- Frontend -->
					<div class="text-center">
						<div class="bg-gradient-to-br from-cyan-400 to-blue-500 w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
							📱
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Frontend</h3>
						<p class="text-gray-600 text-sm">Flutter Multi-Platform</p>
						<div class="mt-4 space-y-1 text-sm text-gray-500">
							<div>• Mobile iOS/Android</div>
							<div>• Progressive Web App</div>
							<div>• Riverpod State Management</div>
						</div>
					</div>

					<!-- Arrow -->
					<div class="hidden lg:flex justify-center">
						<div class="text-4xl text-indigo-400">↔️</div>
					</div>

					<!-- Backend -->
					<div class="text-center">
						<div class="bg-gradient-to-br from-indigo-500 to-purple-600 w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
							⚡
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Backend</h3>
						<p class="text-gray-600 text-sm">Java Quarkus Microservices</p>
						<div class="mt-4 space-y-1 text-sm text-gray-500">
							<div>• 7 Services spécialisés</div>
							<div>• Architecture événementielle</div>
							<div>• Native GraalVM</div>
						</div>
					</div>
				</div>

				<!-- Microservices Detail -->
				<div class="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
					{#each [
						{ name: 'User Service', port: '8010', icon: '👤' },
						{ name: 'Social Service', port: '8020', icon: '👥' },
						{ name: 'Workout Service', port: '8030', icon: '💪' },
						{ name: 'AI Service', port: '8040', icon: '🤖' },
						{ name: 'Device Service', port: '8050', icon: '⌚' },
						{ name: 'Analytics Service', port: '8060', icon: '📊' },
						{ name: 'Notification Service', port: '8070', icon: '🔔' },
						{ name: 'API Gateway', port: '8080', icon: '🚪' }
					] as service, i}
						<div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
							<div class="text-2xl mb-2">{service.icon}</div>
							<div class="font-semibold text-gray-900 text-sm">{service.name}</div>
							<div class="text-xs text-gray-500">:{service.port}</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Architecture Features -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each architectureFeatures as feature, i}
				{#if isVisible.architecture}
					<div 
						in:fly="{{ y: 50, duration: 600, delay: i * 100, easing: quintOut }}"
						class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
					>
						<div class="text-3xl mb-4">{feature.icon}</div>
						<h3 class="font-bold text-gray-900 mb-2">{feature.title}</h3>
						<p class="text-gray-600 text-sm">{feature.description}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- DevOps & Performance Section -->
<section class="py-24 bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-white mb-6">
				DevOps & <span class="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Performance</span>
			</h2>
		</div>

		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<!-- DevOps Pipeline -->
			<div class="bg-gray-800 rounded-2xl p-8">
				<h3 class="text-2xl font-bold text-white mb-6">Pipeline CI/CD</h3>
				<div class="space-y-4">
					{#each [
						{ step: 'Code Push', icon: '📝', desc: 'Git commit sur production' },
						{ step: 'Tests Auto', icon: '🧪', desc: 'Tests unitaires & intégration' },
						{ step: 'Build Native', icon: '⚡', desc: 'Image Docker optimisée' },
						{ step: 'Deploy K8s', icon: '🚀', desc: 'Déploiement automatique' },
						{ step: 'Monitoring', icon: '📊', desc: 'Métriques & alertes' }
					] as step, i}
						<div class="flex items-center space-x-4 p-4 bg-gray-700 rounded-xl">
							<div class="text-2xl">{step.icon}</div>
							<div>
								<div class="text-white font-semibold">{step.step}</div>
								<div class="text-gray-300 text-sm">{step.desc}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Performance Metrics -->
			<div class="space-y-8">
				<div class="text-center">
					<h3 class="text-2xl font-bold text-white mb-8">Performances Cibles</h3>
				</div>
				
				{#each [
					{ metric: 'Temps de démarrage', value: '< 1s', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
					{ metric: 'Utilisateurs simultanés', value: '100k+', icon: '👥', color: 'from-blue-400 to-purple-500' },
					{ metric: 'Temps de réponse API', value: '< 200ms', icon: '🎯', color: 'from-green-400 to-blue-500' },
					{ metric: 'Disponibilité', value: '99.9%', icon: '🛡️', color: 'from-purple-400 to-pink-500' }
				] as perf}
					<div class="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<div class="bg-gradient-to-r {perf.color} w-12 h-12 rounded-xl flex items-center justify-center text-xl">
									{perf.icon}
								</div>
								<div>
									<div class="text-white font-semibold">{perf.metric}</div>
									<div class="text-gray-300 text-sm">Objectif de performance</div>
								</div>
							</div>
							<div class="text-3xl font-bold bg-gradient-to-r {perf.color} bg-clip-text text-transparent">
								{perf.value}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section id="contact" class="py-24 bg-gradient-to-br from-indigo-600 to-purple-700">
	<div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
		<div in:fly="{{ y: 50, duration: 800, easing: quintOut }}">
			<h2 class="text-4xl sm:text-5xl font-bold text-white mb-8">
				Rejoignez l'Innovation Sportive
			</h2>
			<p class="text-xl text-white/90 mb-12">
				Participez au développement d'une plateforme qui va révolutionner l'expérience sportive. 
				Que vous soyez développeur, designer, ou passionné de sport, votre contribution compte !
			</p>
		</div>

		<div in:fly="{{ y: 50, duration: 800, delay: 200, easing: quintOut }}" class="flex flex-col sm:flex-row gap-6 justify-center">
			<button class="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
				🚀 Contribuer au projet
			</button>
			<button class="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
				📧 Nous contacter
			</button>
		</div>

		<div in:fade="{{ duration: 800, delay: 400 }}" class="mt-16 grid md:grid-cols-3 gap-8">
			{#each [
				{ icon: '📧', title: 'Email', value: 'hello@ferum-ai.dev' },
				{ icon: '💻', title: 'GitHub', value: 'github.com/ferum-ai' },
				{ icon: '💬', title: 'Discord', value: 'Communauté ferum AI' }
			] as contact}
				<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
					<div class="text-3xl mb-3">{contact.icon}</div>
					<div class="text-white font-semibold mb-1">{contact.title}</div>
					<div class="text-white/80 text-sm">{contact.value}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div class="flex items-center justify-center space-x-2 mb-6">
				<div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-sm">SN</span>
				</div>
				<span class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ferum AI</span>
			</div>
			<p class="text-gray-400 mb-8">
				Révolutionner l'expérience sportive grâce à l'intelligence artificielle et la technologie moderne.
			</p>
			<div class="text-sm text-gray-500">
				© 2024 ferum AI - Projet étudiant innovant | Technologies : Java Quarkus • Flutter • IA • Kubernetes
			</div>
		</div>
	</div>
</footer>
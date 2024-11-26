<script setup>
import { onMounted, ref } from 'vue';
import DG from '2gis-maps';

const coords = ref([])

const selectedPoints = ref([]);

// onMounted(async () => {
// 	const map = new DG.Map('map', {
// 		center: [54.98, 82.89],
// 		zoom: 13
// 	});
//
// 	const rulerControl = DG.control.ruler({position: 'bottomleft'}).addTo(map);
//
// 		map.on('click', function(e) {
// 			console.log()
// 		})
//
// });

onMounted(async () => {
	const map = DG.map('map', {
		center: [54.98, 82.89],
		zoom: 13
	})
	let polygons = DG.featureGroup();

	map.on('click', function(e) {
		coords.value.push([e.latlng.lat, e.latlng.lng]);
		if(coords.value.length === 1){
			DG.marker(e.latlng, {
			}).addTo(map);
		} else {
			coords.value.forEach(elem => {
				DG.marker(elem, {
					icon: myIcon
				}).addTo(map);
			})
			console.log(coords.value)

			// Добавление многоугольников в группу
			DG.polyline( coords.value, {
				color: "blue",
			}).addTo(polygons);

			// Добавление группы на карту
			polygons.addTo(map);


			// Подстройка границ карты
			map.fitBounds(polygons.getBounds());
		}

	})

	const myIcon = DG.icon({
		iconUrl: 'https://maps.api.2gis.ru/2.0/example_logo.png',
		iconSize: [0, 0]
	});


	// DG.marker([54.98, 82.89], {
	// 	icon: myIcon
	// }).addTo(map);

})

</script>

<template>
	<div class="container">
		<div id="map"></div>
	</div>
</template>

<style lang="scss">
	#map {
		height: 300px;
	}
</style>

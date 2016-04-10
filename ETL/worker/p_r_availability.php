<?php
/**
 * Created by PhpStorm.
 * User: justhjoachim
 * Date: 08/04/2016
 * Time: 23:11
 */

$pRAvailabilityConfig = require_once '../config/p_r_availability.php';

if (isNullOrEmpty($pRAvailabilityConfig['rssFeed'])) {
  echo 'Error. No feed url is given.' . PHP_EOL;
  exit();
}

if (isNullOrEmpty($pRAvailabilityConfig['nameSpace'])) {
  echo 'Error. No feed url is given.' . PHP_EOL;
  exit();
}

$arrayOfEntities = getAndParseFeed($pRAvailabilityConfig['rssFeed'], $pRAvailabilityConfig['nameSpace']);

pushEntitiesInCache($arrayOfEntities);
//getEntitiesFromCache();

/**
 * This function will verify if the value given is null or empty and return the test result
 * @param $value
 * @return bool
 */
function isNullOrEmpty($value) {
  return (is_null($value) || empty($value));
}

function getAndParseFeed($feedUrl, $nameSpace) {
  $arrayOfEntities = [];
  $rss = simplexml_load_file($feedUrl);

  foreach ( $rss->channel->item as $entry ) :
    $vdlxml = $entry->children($nameSpace);
    $arrayOfEntities[] = mapItemToEntity($entry->title, $vdlxml);
  endforeach;

  return $arrayOfEntities;
}

/**
 * This function will map the given item (simple xml dom element) to an entity
 * @param $item
 * @return array
 */
function mapItemToEntity($title, $item) {
  $temporaryEntity = [
    'name'    => '',
    'total'   => 0,
    'actuel'  => 0,
    'tendance'=> 0,
    'ouvert'  => 0,
    'complet' => false,
    'position'  => [
      'lat' => '',
      'lng' => '',
    ],
    'nominal' => [
      'total'     => 0,
      'surface'   => 0,
      'couvertes' => 0,
      'pmr'       => 0,
      'pregnant'  => 0,
      'velos'     => 0,
      'motos'     => 0,
      'autocars'  => 0,
    ],
    '24hfree' => false,
  ];

  $temporaryEntity['name']                  = (string) $item->quartier[0] . ' ' . (string) $title;
  $temporaryEntity['total']                 = (int) $item->total;
  $temporaryEntity['actuel']                = (int) $item->actuel;
  $temporaryEntity['tendance']              = (int) $item->tendance;
  $temporaryEntity['ouvert']                = (int) $item->ouvert;
  $temporaryEntity['complet']               = (bool) $item->complet;
  $temporaryEntity['position']['lat']       = (float) $item->localisation->localisationLatitude;
  $temporaryEntity['position']['lng']       = (float) $item->localisation->localisationLongitude;
  $temporaryEntity['nominal']['total']      = (int) $item->nominal->total;
  $temporaryEntity['nominal']['surface']    = (int) $item->nominal->surface;
  $temporaryEntity['nominal']['couvertes']  = (int) $item->nominal->couvertes;
  $temporaryEntity['nominal']['pmr']        = (int) $item->nominal->pmr;
  $temporaryEntity['nominal']['pregnant']   = (int) $item->nominal->pregnant;
  $temporaryEntity['nominal']['velos']      = (int) $item->nominal->velos;
  $temporaryEntity['nominal']['motos']      = (int) $item->nominal->motos;
  $temporaryEntity['nominal']['autocars']   = (int) $item->nominal->autocars;
  $temporaryEntity['24hfree']               = ('park and ride' === strtolower((string) $item->quartier[0]));

  return $temporaryEntity;

}

/**
 * This function will prepare redis
 * @return Redis
 */
function generateRedis() {
  $redisServer = new Redis();
  $redisServer->connect('realmobiliteit.redis.cache.windows.net', 6379);
  $redisServer->auth('ur7g38REPcKI2HZhqptnKXN7RA/abHQ2CvugMsblR6c=');
  return $redisServer;
}

/**
 * This function will push on redis all entities
 * @param $arrayOfEntities
 */
function pushEntitiesInCache($arrayOfEntities) {
  $redisServer = generateRedis();
  foreach($arrayOfEntities as $entity) {
    $redisServer->hSet('parking', $entity['name'], json_encode($entity));
    $redisServer->hMSet($entity['name'], array('lat' => $entity['position']['lat'], 'lng' => $entity['position']['lng']));
  }
}

/**
 * This function will get entities from the redis cache
 */
function getEntitiesFromCache() {
  $redisServer = generateRedis();
  var_dump(json_decode($redisServer->hGet('parking')));
}
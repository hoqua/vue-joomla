<?php defined('_JEXEC') or die;


jimport('joomla.plugin.plugin');


class plgAjaxProducts extends JPlugin
{

	function onAjaxProducts()
	{

        $db    = JFactory::getDbo();

        $array = json_decode(file_get_contents('php://input'));

        if(property_exists($array, 'delete')){
            $query = $db->getQuery(true);

            if(property_exists($array, 'id')){
                $id = $array->id;

                $query->delete('#__products_json');
                $query->where(' id = ' . $db->quote($id));
                $db->setQuery($query);

                try {
                    $db->setQuery($query);
                    $result = $db->query();
                    return $result;
                } catch (RuntimeException $e) {
                    return $e->getMessage();
                }
            }
            return 'No ID provided';
         }

       if(property_exists($array, 'getByName')){

        $query = $db->getQuery(true);

            if(property_exists($array, 'name')){
                   $name = $array->name;

                   $query->select('*');
                   $query->from('#__products_json');
                   $query->where(' name = ' . $db->quote($name));
                   $db->setQuery($query);

                   if ($db->getErrorNum()) {
                     return $db->getErrorMsg();
                   }
                   return $db->loadObjectList();
            }
           return 'No Name provided';
       }

		if(property_exists($array, 'getAll')){
            $query = $db->getQuery(true);

            $query->select('*');
            $query->from('#__products_json');
            $db->setQuery($query);

            if ($db->getErrorNum()) {
                return $db->getErrorMsg();
            }

            return $db->loadObjectList();
		}

		if(property_exists($array, 'getById')){

		    $query = $db->getQuery(true);

		    if(property_exists($array, 'id')){
                $id = $array->id;

                $query->select('*');
                $query->from('#__products_json');
                $query->where(' id = ' . $db->quote($id));
                $db->setQuery($query);

                if ($db->getErrorNum()) {
                  return $db->getErrorMsg();
                }

                return $db->loadObjectList();
		    }
            return 'No ID provided';
        }

        if(property_exists($array, 'setProduct')){

            $query = $db->getQuery(true);

            $columns = array();
            $values = array();

            if(property_exists($array, 'id')){
                $id = $array->id;
                $jsonData = $array->data;
                $name = $array->setProduct;

                $columns  = array('id', 'name', 'json');
                $values = array($db->quote($id), $db->quote($name), $db->quote($jsonData));
            } else {
                $jsonData = $array->data;
                $name = $array->setProduct;

                $columns  = array('name', 'json');
                $values = array($db->quote($name), $db->quote($jsonData));
            }

            $query
                ->insert($db->quoteName('#__products_json'))
                ->columns($db->quoteName($columns))
                ->values(implode(',', $values));

            $query .= ' ON DUPLICATE KEY UPDATE ' . $db->quoteName('json') . ' = ' . $db->quote($jsonData);
            $db->setQuery($query);

            $db->query();

            return 'success';
        }

        return 'No action matches';

	}
}

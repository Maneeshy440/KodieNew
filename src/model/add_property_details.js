var dbConn = require("../../config/db.config");

async function add_property_details(lookupData) {
  const add_property = {
    user: lookupData.user,
    user_account_details_id: lookupData.user_account_details_id,
    location: lookupData.location,
    location_longitude: lookupData.location_longitude,
    location_latitude: lookupData.location_latitude,
    islocation: lookupData.islocation,
    property_description: lookupData.property_description,
    property_type: lookupData.property_type,
    key_features: lookupData.key_features,
    UPD_FLOOR_SIZE: lookupData.UPD_FLOOR_SIZE,
    UPD_LAND_AREA: lookupData.UPD_LAND_AREA,
    additional_features: lookupData.additional_features,
    additional_key_features: lookupData.additional_key_features,
    autolist: lookupData.autolist,
    p_state: lookupData.p_state,
    p_country: lookupData.p_country,
    p_city: lookupData.p_city,
  };

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_SAVE_ADD_PROPERTY_DETAILS(?)", [
        JSON.stringify(add_property),
      ]);
     console.log(results[0][0].result,"rersere");
    // const [output] = await dbConn
    //   .promise()
    //   .query("SELECT @out_property_id AS out_property_id");
    // const out_property_id = output[0].out_property_id;
    // console.log("Inserted Job ID:", out_property_id);
    // const property_id=
     return results[0][0].result;
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function add_property_images_details(
  property_id,
  images,
  images_type,
  images_name
) {
  console.log("assa", property_id);
  console.log("images", images);
  console.log("type", images_type);
  console.log("name", images_name);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_SAVE_PROPERTY_IMAGES(?,?,?,?)", [
        property_id,
        images_type,
        images_name,
        images,
      ]);

    return { results };
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function add_property_video_details(
  property_id,
  images,
  images_type,
  images_name
) {
  console.log("assa", property_id);
  console.log("images", images);
  console.log("type", images_type);
  console.log("name", images_name);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_SAVE_PROPERTY_VIDEO(?,?,?,?)", [
        property_id,
        images_type,
        images_name,
        images,
      ]);

    return { results };
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function get_property_details_by_id(req, property_id) {
  console.log(property_id, "property_id");
  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_GET_PROPERTY_DETAILS_Test(?)", [property_id]);

    const additional_key_features = [results[0][0].additional_key_features];
    console.log(additional_key_features, "aassas");

    results[0][0].additional_key_features = additional_key_features;
    const imageFileNames = results[0][0].image_path;

    console.log("Image File Names:", imageFileNames);
    const protocol ="https";
    const basePath = `${protocol}://${req.get("host")}/upload/photo`;
    const imagePaths = imageFileNames
      ? imageFileNames
          .split(", ")
          .map((fileName) => `${basePath}/${fileName.trim()}`)
      : [];
    console.log("Image Paths:", imagePaths);
    results[0][0].image_path = imagePaths;

    const videosFileNames = results[0][0].video_path;

    console.log("Image File Names:", videosFileNames);

    const basePath1 = `${protocol}://${req.get("host")}/upload/photo`;
    const videosPaths = videosFileNames
      ? videosFileNames
          .split(", ")
          .map((fileName) => `${basePath1}/${fileName.trim()}`)
      : [];
    console.log("Image Paths:", videosPaths);
    results[0][0].video_path = videosPaths;

    return results[0];
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
}

async function update_property_details(lookupData) {
  const update_property = {
    user: lookupData.user,
    user_account_details_id: lookupData.user_account_details_id,
    location: lookupData.location,
    location_longitude: lookupData.location_longitude,
    location_latitude: lookupData.location_latitude,
    islocation: lookupData.islocation,
    property_description: lookupData.property_description,
    property_type: lookupData.property_type,
    key_features: lookupData.key_features,
    UPD_FLOOR_SIZE: lookupData.UPD_FLOOR_SIZE,
    UPD_LAND_AREA: lookupData.UPD_LAND_AREA,
    additional_features: lookupData.additional_features,
    additional_key_features: lookupData.additional_key_features,
    autolist: lookupData.autolist,
    p_state: lookupData.p_state,
    p_country: lookupData.p_country,
    p_city: lookupData.p_city,
    property_id: lookupData.property_id,
  };
  console.log("asasas", update_property);
  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_SAVE_UPDATE_PROPERTY_DETAILS_test(?)", [
        JSON.stringify(update_property),
      ]);
    console.log(results, "results");
    return results;
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function update_property_images_details(property_id) {
  console.log("assa", property_id);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_UPDATE_IMAGES(?)", [property_id]);

    return { results };
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function update_property_video_details(property_id) {
  console.log("assa", property_id);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_UPDATE_VIDEO(?)", [property_id]);

    return { results };
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function delete_property_details(property_id) {
  console.log("assa", property_id);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_DELETE_PROPERTY(?)", [property_id]);

    return { results };
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function filter_property_details(
  req,
  p_property_filter,
  user_account_id,
  page_no,
  limit,
  order_col,
  order_wise
) {
  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_GET_ALL_PROPERTY_BY_FILTER_TEST(?,?,?,?,?,?)", [
        p_property_filter,
        user_account_id,
        page_no,
        limit,   
        order_col,
        order_wise,
      ]);

    console.log(results[0].length,"length");

    for(let i=0; i<results[0].length; i++)
    {
      const imageFileNames = results[0][i].image_path;
      const protocol ="https";
      const basePath = `${protocol}://${req.get("host")}/upload/photo`;
      const imagePaths = imageFileNames
        ? imageFileNames
            .split(", ")
            .map((fileName) => `${basePath}/${fileName.trim()}`)
        : [];
      console.log("Image Paths:", imagePaths);
      results[0][i].image_path = imagePaths;
      console.log(i)
    }
    return results[0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function archieve_property_details(property_id) {
  console.log("assa", property_id);

  try {
    const [results] = await dbConn
      .promise()
      .query("CALL USP_KODIE_ADD_PROPERTY_ARCHIEVE(?)", [property_id]);
    console.log(results[0][0].result);
    return results[0][0].result;
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}

async function vacant_property_details(req,res) {
  try {
    const [results] = await dbConn.promise().query("CALL USP_KODIE_GET_LIST_VACANT_PROPERTY");
    console.log(results[0],"asasas")

    console.log(results[0].length,"length");

    for(let i=0; i<results[0].length; i++)
    {
      const imageFileNames = results[0][i].image_path;
      const protocol ="https";
      const basePath = `${protocol}://${req.get("host")}/upload/photo`;
      const imagePaths = imageFileNames
        ? imageFileNames
            .split(", ")
            .map((fileName) => `${basePath}/${fileName.trim()}`)
        : [];
      console.log("Image Paths:", imagePaths);
      results[0][i].image_path = imagePaths;
      console.log(i)
    }
    return results[0];
  } catch (error) {
    console.error("Error getting job details:", error);
    throw error;
  }
}
module.exports = {
  add_property_details,
  add_property_images_details,
  add_property_video_details,
  get_property_details_by_id,
  update_property_details,
  update_property_video_details,
  update_property_images_details,
  delete_property_details,
  filter_property_details,
  archieve_property_details,
  vacant_property_details
};

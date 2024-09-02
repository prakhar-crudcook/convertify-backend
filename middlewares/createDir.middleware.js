import { log } from "console";
import { stat,mkdir } from "fs/promises";

const createDir = async (sessionId, parentDir) => {
  // console.log(sessionId, parentDir)
  const filePath = `./tmp/${sessionId}/${parentDir}`;
  try {
    await stat(filePath);
    return false; // File exists
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(filePath, { recursive: true });
      console.log(`Success creating new directory: ${filePath}`);
      return true;
    } else {
      throw error;
    }
  }
};

const createDirs = async (req, res, next) => {
  if(await createDir(`${req.sessionId}`, "original") && await createDir(req.sessionId, "converted")) {
    next();
  } else {
    return res.status(500).json({
      success: false,
      message: `dir already exists!`,
    });
  }
  
};

export default createDirs;

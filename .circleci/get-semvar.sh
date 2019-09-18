branch=$(git rev-parse --abbrev-ref HEAD)
latest=$(git describe --tags $(git rev-list --tags --max-count=1))
 
semver_parts=(${latest//./})
major=${semver_parts[0]}
minor=${semver_parts[1]}
patch=${semver_parts[2]}
 
count=$(git rev-list HEAD ^${latest} --ancestry-path ${latest} --count)
export version=""
 
case $branch in
   "master")
      version=${major}.$((minor+1)).0
      ;;
   "feature/*")
      version=${major}.${minor}.${patch}-${branch}-${count}
      ;;
   *)
      version=${major}.${minor}.$((patch+1))
      ;;
esac
 
echo ${version}
exit 0